terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# -----------------------------------------------------------------------------
# Variables
# -----------------------------------------------------------------------------
variable "aws_region" {
  default     = "ap-south-1" # Mumbai region
  description = "AWS Deployment Region"
}

variable "instance_type" {
  default     = "t3.small"
  description = "EC2 Instance type for running Docker & Crewzen"
}

# -----------------------------------------------------------------------------
# Security Group (Allow HTTP, HTTPS, SSH & Crewzen Port 3000)
# -----------------------------------------------------------------------------
resource "aws_security_group" "crewzen_sg" {
  name        = "crewzen-production-sg"
  description = "Security Group for Crewzen SaaS Web Platform"

  # SSH Access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Crewzen App Direct Port
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound All Traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# -----------------------------------------------------------------------------
# AWS EC2 Virtual Machine with Automated Docker Startup Script (User Data)
# -----------------------------------------------------------------------------
resource "aws_instance" "crewzen_server" {
  ami           = "ami-0dee22c13ea7a9a67" # Ubuntu 22.04 LTS (ap-south-1)
  instance_type = var.instance_type
  vpc_security_group_ids = [aws_security_group.crewzen_sg.id]

  # User Data: Automatically install Docker, Docker Compose, Git & Nginx on boot
  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y docker.io docker-compose git nginx
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ubuntu
              EOF

  tags = {
    Name        = "Crewzen-SaaS-Production-Server"
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------
output "server_public_ip" {
  value       = aws_instance.crewzen_server.public_ip
  description = "Public IP address of the Crewzen production server"
}

output "application_url" {
  value       = "http://${aws_instance.crewzen_server.public_ip}:3000"
  description = "Direct URL to access Crewzen"
}

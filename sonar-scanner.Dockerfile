FROM sonarsource/sonar-scanner-cli:latest

# Set working directory inside container
WORKDIR /usr/src/app

# Copy source code into container (optional if running from volume)
# COPY . .

# Default command (override this when running)
CMD ["sonar-scanner"]

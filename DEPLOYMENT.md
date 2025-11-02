# Deploying Strapi to Fly.io (Free Plan)

This guide will help you deploy your Strapi application to Fly.io's free tier.

## Prerequisites

1. Install the Fly.io CLI:
```bash
# macOS
brew install flyctl

# Or using install script
curl -L https://fly.io/install.sh | sh
```

2. Login to Fly.io:
```bash
flyctl auth login
```

## Initial Setup

### 1. Create the Fly.io App (First Time Only)

If you haven't created the app yet:
```bash
flyctl launch --no-deploy
```

This will detect your existing `fly.toml` configuration.

### 2. Create a Volume for SQLite Database

Fly.io's free plan includes 3GB of persistent storage. Create a volume:

```bash
flyctl volumes create data --region fra --size 1
```

**Important:** The volume must be created in the same region as specified in `fly.toml` (fra = Frankfurt).

### 3. Set Required Secrets

Strapi requires certain environment variables to be set as secrets:

```bash
# Generate random keys (do this in your terminal first)
# You can use: openssl rand -base64 32

# Set the secrets
flyctl secrets set APP_KEYS="your-app-key-1,your-app-key-2,your-app-key-3,your-app-key-4"
flyctl secrets set API_TOKEN_SALT="your-random-token-salt"
flyctl secrets set ADMIN_JWT_SECRET="your-admin-jwt-secret"
flyctl secrets set TRANSFER_TOKEN_SALT="your-transfer-token-salt"
flyctl secrets set JWT_SECRET="your-jwt-secret"
```

**Generate secrets easily:**
```bash
# Generate all secrets at once
APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

# Set them
flyctl secrets set APP_KEYS="$APP_KEYS"
flyctl secrets set API_TOKEN_SALT="$API_TOKEN_SALT"
flyctl secrets set ADMIN_JWT_SECRET="$ADMIN_JWT_SECRET"
flyctl secrets set TRANSFER_TOKEN_SALT="$TRANSFER_TOKEN_SALT"
flyctl secrets set JWT_SECRET="$JWT_SECRET"
```

### 4. Optional: Set Admin URL

If you want to access the admin panel:
```bash
flyctl secrets set ADMIN_URL="/admin"
```

## Deploy

Deploy your application:

```bash
flyctl deploy
```

This will:
1. Build your Docker image
2. Push it to Fly.io
3. Create/update your app
4. Start the instance

## Access Your App

Once deployed:

```bash
# Open your app in browser
flyctl open

# Access admin panel
flyctl open /admin
```

Your app will be available at: `https://mb-portfolio.fly.dev`

## Monitoring

```bash
# View logs
flyctl logs

# Check app status
flyctl status

# SSH into the machine
flyctl ssh console

# Check your volume
flyctl volumes list
```

## Free Tier Limits

The Fly.io free tier includes:
- 3 shared-cpu-1x VMs with 256MB RAM each (we're using 1GB which is still free)
- 3GB persistent volume storage (we're using 1GB)
- 160GB outbound data transfer

Your app will auto-stop when idle and auto-start on requests (configured in `fly.toml`).

## Troubleshooting

### App won't start

Check logs:
```bash
flyctl logs
```

### Database issues

The SQLite database is stored in `/data/data.db` on the persistent volume. Check if the volume is mounted:
```bash
flyctl ssh console
ls -la /data
```

### Out of memory

If you get OOM errors, the 1GB RAM should be sufficient for Strapi, but you can check memory usage:
```bash
flyctl ssh console
free -m
```

### Reset the database

If you need to start fresh:
```bash
flyctl ssh console
rm /data/data.db
exit
flyctl apps restart
```

## Updating Your App

After making changes to your code:

```bash
flyctl deploy
```

## Scaling (Beyond Free Tier)

To add more machines or increase resources:
```bash
# Add another machine
flyctl scale count 2

# Increase RAM (paid)
flyctl scale memory 2048
```

## Important Notes

1. **SQLite Limitations**: SQLite works for single-instance deployments. If you scale to multiple machines, you'll need to switch to PostgreSQL.

2. **File Uploads**: Uploaded files are stored in the volume at `/data`. They persist across deployments.

3. **Backups**: Fly.io doesn't automatically backup volumes. Consider setting up regular backups:
   ```bash
   flyctl ssh console
   sqlite3 /data/data.db .dump > /tmp/backup.sql
   ```

4. **Auto Stop/Start**: The app will automatically stop when idle and restart on requests. First request after idle may be slow.

## Support

- Fly.io Docs: https://fly.io/docs/
- Strapi Docs: https://docs.strapi.io/
- Fly.io Community: https://community.fly.io/


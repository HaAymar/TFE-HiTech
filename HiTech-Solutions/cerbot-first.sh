docker run -it --rm --name certbot \
    -p 80:80 -p 443:443 \
    -v "/home/ubuntu/hitech-solutions/certbot:/etc/letsencrypt" \
    certbot/certbot certonly --standalone \
    -d hitech-solutions.be -d www.hitech-solutions.be \
    --non-interactive --agree-tos \
    --email aymar.hakizimana@gmail.com --expand

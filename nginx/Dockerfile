FROM nginx:alpine

# Copiar la configuración de NGINX y los certificados
COPY default.conf /etc/nginx/conf.d/default.conf
COPY certs        /etc/nginx/certs
COPY static       /usr/share/nginx/html

# Cambiar los permisos de los archivos copiados
RUN chmod -R 755 /usr/share/nginx/html
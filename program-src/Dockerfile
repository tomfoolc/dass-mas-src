FROM artifactrepo.server.ha.org.hk:55743/int_docker_dev/projects/appsvc/nginx-112:1-52

COPY nginx.conf /etc/nginx/nginx.conf
COPY build /opt/app-root/src

EXPOSE 8080 80
CMD ["nginx", "-g", "daemon off;"]
# ws-proxy

In compose:

```
...
  wsproxy:
    image: dejandayoff/wsproxy
    container_name: wsproxy
    networks:
      - audio
    restart: always
    environment:
      - "TCP_PORT=1705"
      - "TCP_HOST=snapcast"
...
```

# To Build:

`docker build -t wsproxy .`
`docker run -it --rm -p 8081:8080 -e TCP_PORT=1705 -e TCP_HOST=192.168.1.10 wsproxy`
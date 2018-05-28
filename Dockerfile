FROM golang:1.10-alpine
ENV GOPATH /go
ENV APIPATH $GOPATH/pro-net-api
ENV PATH $APIPATH:$GOPATH/bin:/usr/local/go/bin:$PATH

ADD . $APIPATH
WORKDIR $APIPATH
RUN apk add --no-cache ca-certificates \
  dpkg \
  gcc \
  git \
  musl-dev \
  bash \
  make \
  curl \
  && curl https://glide.sh/get | sh
RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" \
  && chmod -R 777 "$GOPATH" \
  && chmod +x entrypoint.sh
RUN go get github.com/tockins/realize

ENTRYPOINT ["/go/pro-net-api/entrypoint.sh"]
CMD ["realize", "start"]
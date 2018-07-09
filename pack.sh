rm -rf fe/
git archive --format=tar --prefix=fe/ HEAD | (tar xf -)
cp Dockerfile fe/
cp Dockerrun.aws.json fe/
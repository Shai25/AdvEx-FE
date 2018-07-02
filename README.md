# AdvEx-FE

Frontend for [AdvEx](https://github.com/dnc1994/AdvEx).

## Usage

### Install dependencies

```
npm install
```

### Serve with hot reload at localhost:8080

```
npm run dev
```

### Build for production with minification

```
npm run build
```

### Deploy to Elastic Beanstalk

1. Run `./pack.sh`
2. Zip `/fe` (without the parent directory) and upload the bundle to Elastic Beanstalk.

### Deploy to GitHub Pages

```
push-dir --dir=dist --branch=gh-pages
```

(This will no longer deploy a functional site on GitHub Pages, as the code has been modified for real deployment to Elastic Beanstalk.)

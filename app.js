const Koa = require('koa')
const app = new Koa()

app.use(async(ctx,next)=>{
  console.log('first')
  await next()
  console.log('first end')
})


app.use(async(ctx,next)=>{
  console.log('second')
  await next()
  console.log('second end')
})

app.use(async(ctx,next)=>{
  console.log('async')
  await next()
  await new Promise((resolve) =>
  setTimeout(() => {
    console.log(`wait 1000 ms end`);
    resolve();
  }, 1000)
);
console.log("async end");
})

app.use(async (ctx, next) => {
  console.log("third");
  await next();
  console.log("third end");
});

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(3000,()=>{console.log('listne on port 3000')})
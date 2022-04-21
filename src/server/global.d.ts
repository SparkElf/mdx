import * as Koa from 'koa';//关键 https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
https://stackoverflow.com/questions/43160598/adding-properties-to-koa2s-context-in-typescript
declare module 'koa' {
    namespace Application {

    }
}
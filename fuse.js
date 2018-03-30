const { FuseBox, Sparky, SVGPlugin, CSSPlugin, QuantumPlugin, PostCSSPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src/views",
            output: "dist/public/$name.js",
            target : "browser@es5",
            hash: this.isProduction,
            useTypescriptCompiler : true,
            plugins: [
                CSSPlugin({
                    group: "styles.css"
                }),
                PostCSSPlugin([require('postcss-nested')]),
                SVGPlugin(),
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    uglify: true,
                    css : true
                })
            ]
        })
    }
    createBundle(fuse) {
        const app = fuse.bundle("app");
        if (!this.isProduction) {
            app.watch()
            app.hmr()
        }
        app.instructions(">index.tsx");
        return app;
    }
});

task("clean", () => src("dist/public").clean("dist/public").exec() )

task("default", ["clean"], async context => {
    const fuse = context.getConfig();
    fuse.dev();
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["clean"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    fuse.dev(); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});
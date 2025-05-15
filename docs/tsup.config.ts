import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./index.tsx"],
	target: "esnext",
	dts: false,
	sourcemap: false,
	clean: false,
	format: ["iife"],
	publicDir: "./public", // 复制 public 到 dist
	inject: ["./react-shim.js"],
	external: ["react", "react-dom"],
});

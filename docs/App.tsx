import { useState, useEffect } from "react";

export default function App() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// Scroll animation effect
	useEffect(() => {
		const handleScroll = () => {
			document.querySelectorAll("[data-scroll]").forEach((el) => {
				const top = el.getBoundingClientRect().top;
				if (top < window.innerHeight * 0.8) {
					el.classList.add("opacity-100", "translate-y-0");
					el.classList.remove("opacity-0", "translate-y-10");
				}
			});
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Initial check
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
			{/* Navigation */}
			<header className="fixed w-full bg-black/80 backdrop-blur-md z-50">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<div className="flex items-center space-x-2">
						<svg
							className="w-8 h-8 text-emerald-500"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						<span className="text-xl font-bold">Valtio Storybook Auto Bind</span>
					</div>

					{/* Desktop Nav */}
					<nav className="hidden md:flex space-x-8">
						{["Features", "Installation", "Examples", "Documentation"].map(
							(item) => (
								<a
									key={item}
									href={`#${item.toLowerCase()}`}
									className="hover:text-emerald-500 transition-colors"
								>
									{item}
								</a>
							),
						)}
						<a
							href="https://github.com/CosPie/storybook-valtio-auto-bind"
							target="_blank"
							rel="noopener noreferrer"
							className="ml-auto flex items-center"
						>
							<img
								src="https://img.shields.io/github/stars/CosPie/storybook-valtio-auto-bind?style=social"
								alt="GitHub Stars"
								className="h-6"
							/>
						</a>
					</nav>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden text-gray-300 hover:text-white"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={
									mobileMenuOpen
										? "M6 18L18 6M6 6l12 12"
										: "M4 6h16M4 12h16M4 18h16"
								}
							/>
						</svg>
					</button>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="md:hidden bg-gray-900/90 backdrop-blur-md py-4 px-4 space-y-3">
						{["Features", "Installation", "Examples", "Documentation"].map(
							(item) => (
								<a
									key={item}
									href={`#${item.toLowerCase()}`}
									className="block py-2 text-gray-300 hover:text-emerald-500 transition-colors"
									onClick={() => setMobileMenuOpen(false)}
								>
									{item}
								</a>
							),
						)}
						<a
							href="https://github.com/CosPie/storybook-valtio-auto-bind"
							target="_blank"
							rel="noopener noreferrer"
							className="block py-2 text-gray-300 hover:text-emerald-500 transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="flex items-center">
								<img
									src="https://img.shields.io/github/stars/CosPie/storybook-valtio-auto-bind?style=social"
									alt="GitHub Stars"
									className="h-6 mr-2"
								/>
								Star on GitHub
							</span>
						</a>
					</div>
				)}
			</header>

			{/* Hero Section */}
			<section className="pt-32 pb-20 px-4 container mx-auto">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
						Seamless Storybook & Valtio Integration
					</h1>
					<p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
						Create dynamic component previews with two-way state binding between
						Storybook and Valtio stores
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="#installation"
							className="px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-medium
                hover:from-emerald-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300
                shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
						>
							Get Started
						</a>
						<a
							href="#examples"
							className="px-8 py-3 rounded-lg border border-gray-700 bg-gray-800/50 hover:bg-gray-800 
                text-white font-medium transform hover:scale-105 transition-all duration-300"
						>
							View Examples
						</a>
					</div>
					<div className="mt-16">
						<img
							src="https://picsum.photos/800/400"
							alt="Code Preview"
							className="rounded-xl shadow-2xl shadow-black/50 border border-gray-800 mx-auto"
						/>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-20 px-4 bg-gray-900/50">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								title: "Two-Way Binding",
								description:
									"Synchronize Storybook args with Valtio stores in real-time for seamless state management",
								icon: (
									<svg
										className="w-6 h-6 text-emerald-500"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
										/>
									</svg>
								),
							},
							{
								title: "Effortless Debugging",
								description:
									"Instant state reflection in Storybook previews without manual refresh, with full state persistence across stories",
								icon: (
									<svg
										className="w-6 h-6 text-emerald-500"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
										/>
									</svg>
								),
							},
							{
								title: "Flexible Architecture",
								description:
									"Customizable decorators and utilities for advanced use cases and extensions",
								icon: (
									<svg
										className="w-6 h-6 text-emerald-500"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
										/>
									</svg>
								),
							},
						].map((feature, index) => (
							<div
								key={index}
								data-scroll
								className="opacity-0 translate-y-10 transition-all duration-700 delay-100 bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-500/10 backdrop-blur-sm"
							>
								<div className="flex items-start space-x-4">
									<div className="mt-1">{feature.icon}</div>
									<div>
										<h3 className="text-xl font-semibold mb-2">
											{feature.title}
										</h3>
										<p className="text-gray-400">{feature.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Installation Section */}
			<section id="installation" className="py-20 px-4">
				<div className="container mx-auto max-w-4xl">
					<h2 className="text-3xl font-bold text-center mb-12">Installation</h2>
					<div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-xl">
						<div className="mb-4 flex items-center">
							<span className="text-emerald-400 mr-2">$</span>
							<span className="text-gray-400">
								npm install storybook-valtio-auto-bind valtio
							</span>
						</div>
						<div className="border-t border-gray-700 my-4"></div>
						<pre className="text-sm overflow-x-auto">
							<code className="text-gray-300">
								{`// .storybook/preview.tsx
import { ValtioStorybookTwoWayBindingDecorators } from 'storybook-valtio-auto-bind';
export const decorators = [...ValtioStorybookTwoWayBindingDecorators];`}
							</code>
						</pre>
					</div>
				</div>
			</section>

			{/* Example Section */}
			<section id="examples" className="py-20 px-4 bg-gray-900/50">
				<div className="container mx-auto max-w-4xl">
					<h2 className="text-3xl font-bold text-center mb-12">
						Usage Example
					</h2>
					<div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-xl">
						<pre className="text-sm overflow-x-auto">
							<code className="text-gray-300">
								{`import { proxy } from 'valtio';
import { withStores } from 'storybook-valtio-auto-bind';

const counterStore = proxy({ count: 0 });

export default {
  title: 'Example/Counter',
};

export const Counter = withStores(
  { counter: counterStore },
  (args) => (
    <button 
      onClick={() => counterStore.count++}
      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded"
    >
      Count: {args.counter.count}
    </button>
  )
);`}
							</code>
						</pre>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-10 px-4 border-t border-gray-800">
				<div className="container mx-auto max-w-5xl">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="flex items-center space-x-2 mb-6 md:mb-0">
							<svg
								className="w-6 h-6 text-emerald-500"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
							<span className="text-lg font-semibold">
								Valtio Storybook Auto Bind
							</span>
						</div>
						<div className="text-sm text-gray-500">
							© {new Date().getFullYear()} Valtio Storybook Auto Bind. MIT
							Licensed.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

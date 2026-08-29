"use strict";
const { useState, useEffect, useMemo } = React;
function useStarfield(count = 46) {
    return useMemo(() => {
        let seed = 42;
        const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
        return Array.from({ length: count }, (_, i) => ({
            id: i, top: rand() * 100, left: rand() * 100,
            size: 1 + rand() * 1.6, delay: rand() * 4, dur: 2.5 + rand() * 3.5,
        }));
    }, [count]);
}
function LoadingScreen({ fadingOut }) {
    const stars = useStarfield();
    return (React.createElement("div", { className: `mizan-splash ${fadingOut ? "mizan-splash--out" : ""}` },
        React.createElement("div", { className: "mizan-splash__stars" }, stars.map((s) => (React.createElement("span", { key: s.id, className: "mizan-splash__star", style: {
                top: `${s.top}%`, left: `${s.left}%`, width: `${s.size}px`, height: `${s.size}px`,
                animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`,
            } })))),
        React.createElement("div", { className: "mizan-splash__glyph-wrap" },
            React.createElement("svg", { viewBox: "0 0 512 512", className: "mizan-splash__glyph", "aria-hidden": "true" },
                React.createElement("polygon", { className: "mizan-splash__line mizan-splash__line--a", points: "426,256 256,426 86,256 256,86" }),
                React.createElement("polygon", { className: "mizan-splash__line mizan-splash__line--b", points: "376.2,135.8 376.2,376.2 135.8,376.2 135.8,135.8" }),
                React.createElement("polyline", { className: "mizan-splash__line mizan-splash__line--m", points: "212,300 212,214 256,268 300,214 300,300" }))),
        React.createElement("div", { className: "mizan-splash__wordmark" },
            React.createElement("span", null, "M"),
            React.createElement("span", null, "I"),
            React.createElement("span", null, "Z"),
            React.createElement("span", null, "A"),
            React.createElement("span", null, "N")),
        React.createElement("div", { className: "mizan-splash__tagline" }, "clinical & basic sciences reference")));
}
const SPLASH_VISIBLE_MS = 1700;
const SPLASH_FADE_MS = 550;
function App() {
    const [splashState, setSplashState] = useState("visible");
    useEffect(() => {
        const t1 = setTimeout(() => setSplashState("fading"), SPLASH_VISIBLE_MS);
        const t2 = setTimeout(() => setSplashState("gone"), SPLASH_VISIBLE_MS + SPLASH_FADE_MS);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);
    return (React.createElement(React.Fragment, null, React.createElement(Caliph, null), splashState !== "gone" && React.createElement(LoadingScreen, { fadingOut: splashState === "fading" })));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));

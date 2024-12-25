import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import amazone from "../../assets/images/amazon-pay.png";
import amercan from "../../assets/images/American-Express-Color.png";
import master from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
import getapple from "../../assets/images/get-apple-store.png";
import googleplay from "../../assets/images/get-google-play.png";
export default function Footer() {
    return (_jsx("footer", { className: 'bg-slate-100 py-8', children: _jsxs("div", { className: 'container space-y-4', children: [_jsxs("header", { children: [_jsx("h2", { className: 'text-xl text-slate-800 font-semibold', children: "Get the FreshCart App" }), _jsx("p", { className: 'text-slate-400', children: "We Will Send You a Link, Open it your on phone to dowenload the App" })] }), _jsxs("div", { className: 'flex gap-2', children: [_jsx("input", { className: 'from-control grow', type: "email", placeholder: "Email Address" }), _jsx("button", { className: 'btn text-sm uppercase bg-primary-800 hover:bg-primary-900 text-white font-semibold', children: "Share App Link" })] }), _jsxs("div", { className: 'flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50', children: [_jsxs("div", { className: "payment-partners flex gap-3 items-center ", children: [_jsx("h3", { className: 'text-slate-400 font-semibold', children: "payment partners" }), _jsx("img", { className: 'w-24', src: amazone, alt: 'amazone' }), _jsx("img", { className: 'w-24', src: amercan, alt: 'amercan' }), _jsx("img", { className: 'w-20', src: master, alt: 'master' }), _jsx("img", { className: 'w-24', src: paypal, alt: 'paypal' })] }), _jsxs("div", { className: "downlode flex gap-3 items-center", children: [_jsx("img", { className: 'w-24', src: getapple, alt: 'getapple' }), _jsx("img", { className: 'w-[108px]', src: googleplay, alt: 'googleplay' })] })] })] }) }));
}


import CardNav from "./RayatvaCardNav";

export default function Navbar() {
    return (
        <CardNav
            logo="/Rayatva MainLogo.png"
            logoAlt="RAYATVA"
            logoHref="/"
            theme="dark"
            surface="glass"
            accentColor="#F15A24"
            openOn="click"
            cardEffect="rise"
            stagger={0.14}
            bounce={0.22}
            speed={1.1}
            cardHeight={190}
            maxWidth={1120}
            cta={{
                label: "Get Started",
                href: "/#courses",
            }}
        />
    );
}

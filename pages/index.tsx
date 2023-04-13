import logo from "../assets/images/dbitlogo.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section id="home" className="bg-primary container-full">
      <Image src={logo} alt="" />
      <div className="landing-text">
        <h1>Don Bosco Institute of Technology</h1>
        <p>Online Elections Portal</p>
      </div>
      <Link href={"/portal"}>
        <button className="btn-primary">Continue to Portal</button>
      </Link>
    </section>
  );
}

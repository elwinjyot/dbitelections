import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section id="home" className="bg-primary container-full">
      <Image src={"https://ezgsausrazdmuxcqepvl.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202023-04-13%20at%2016.02.59.jpg?t=2023-04-16T16%3A34%3A01.015Z"} width={400} height={400} alt="" />
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

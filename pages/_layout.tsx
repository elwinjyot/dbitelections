import { useRouter } from "next/router";
// import

export default function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <section className="bg-primary container-full">
      {children}
      {/* {router.pathname === "/" ? children : (
      )} */}
    </section>
  );
}

interface Props {
  children: any;
}

import { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";

const VoteConfirmation: FunctionComponent = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.back();
    }, 3000);
  });

  return (
    <section className="confirmation">
      <div className="popup">
        <span className="material-symbols-rounded">how_to_vote</span>
        <h2>Your vote has been recorded!</h2>
        <p>You will be redirected back in 3 seconds.</p>
      </div>
    </section>
  );
};

export default VoteConfirmation;

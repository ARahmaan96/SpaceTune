import React from "react";

export default function About() {
  return <div>About</div>;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

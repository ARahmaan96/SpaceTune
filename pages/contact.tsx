import React from "react";

export default function Contact() {
  return <div>Contact Us</div>;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

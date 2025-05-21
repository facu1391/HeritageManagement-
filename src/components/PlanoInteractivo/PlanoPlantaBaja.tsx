
"use client";

import Link from "next/link";

export default function PlanoPlantaBaja() {
  return (
    <svg
      viewBox="0 0 737 985"
      width="100%"
      height="auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        href="/Anexo-Platabaja.png"
        x="0"
        y="0"
        width="737"
        height="985"
      />

      <Link href="/Subdependencia/Recepcion" passHref legacyBehavior>
        <a>
          <rect
            x="5"
            y="850"
            width="60"
            height="40"
            fill="transparent"
            stroke="red"
            strokeWidth="2"
            cursor="pointer"
          />
        </a>
      </Link>

      <Link href="/Subdependencia/Oficina-910" passHref legacyBehavior>
        <a>
          <rect
            x="160"
            y="730"
            width="60"
            height="40"
            fill="transparent"
            stroke="blue"
            strokeWidth="2"
            cursor="pointer"
          />
        </a>
      </Link>
    </svg>
  );
}

import React from "react";

export default function Footer() {
  const now = new Date();

  return (
    <footer>
      Copyright &copy; 2020-{now.getFullYear()}. Mahmoud Kebbeh, All rights reserved.
    </footer>
  );
}

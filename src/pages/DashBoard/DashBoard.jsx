import React, { useState } from "react";
import styles from "./DashBoard.module.css";

export default function DashBoard() {
  return (
    <div className="h-100 flex-grow-1" id={styles.DashBoard}>
      <h1>DashBoard</h1>
    </div>
  );
}

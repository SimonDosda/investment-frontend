import Link from "next/link";
import { PropsWithChildren, useState } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const [isActive, setActive] = useState(false);

  return (
    <>
      <header>
        <nav className="navbar is-primary" role="navigation">
          <div className="container is-fluid">
            <div className="navbar-brand">
              <Link href="/" className="navbar-item">
                Investment
              </Link>
              <a
                role="button"
                className={`navbar-burger ${isActive ? "is-active" : ""}`}
                aria-label="menu"
                aria-expanded="false"
                onClick={() => setActive(!isActive)}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
              <div className="navbar-start">
                <Link className="navbar-item" href="/assets">
                  Assets
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

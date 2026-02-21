import React from "react";

function Navbar({ onCoursesClick = () => {}, onContributeClick = () => {} }) {
    return(
        <>
        <nav className="fixed top-0 left-0 w-screen z-50">
            <ul className="flex flex-row justify-around items-center h-16 bg-[var(--color-cyberDark)]  text-[var(--color-neonBlue)]">
                <li className="cursor-pointer" onClick={onCoursesClick}>Courses</li>
                <li>Challenges</li>
                <li>Dashboard</li>
                <li>Collaborate</li>
                <li className="cursor-pointer" onClick={onContributeClick}>Contribute</li>
            </ul>
            </nav>
        </>
    )
}

export default Navbar;

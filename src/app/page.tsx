// "app/page.tsx"
"use client";
import MainContainer from "./components/MainContainer/page";
import Advertising from "./components/Home/Advertising/page";
import Emphasis from "./components/Home/Emphasis/page";
import Evaluated from './components/Home/Evaluated/page';
import Sale from './components/Home/Sale/page';

export default function Home() {
    return (
        <>
            <MainContainer>
                <Advertising/>
                <Emphasis/>
                <Evaluated/>
                <Sale/>
            </MainContainer>
        </>
    );
}

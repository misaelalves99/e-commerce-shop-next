// "app/page.tsx"
"use client";
import MainContainer from "./components/MainContainer/MainContainer";
import Advertising from "./components/Home/Advertising/Advertising";
import Emphasis from "./components/Home/Emphasis/Emphasis";
import Evaluated from './components/Home/Evaluated/Evaluated';
import Sale from './components/Home/Sale/Sale';

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

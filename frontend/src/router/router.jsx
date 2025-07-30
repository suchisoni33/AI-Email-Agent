// import { BrowserRouter as AppRouter, Routes, Route } from 'react-router-dom';
// import Auth from '../views/auth/auth';
// import Chat from '../views/chat/chat';

//  export const Router = () => {
//     return (
//         <AppRouter>
//             <Routes>
//                 <Route path="/" element={<h1>Home</h1>} />
//                  <Route path="/auth" element={<Auth />} />
//                       <Route path="/auth/success" element={<h1>Success</h1>} />
//                        <Route path="/chat" element={<Chat/>} />
//                   <Route path="*" element={<h1>404 Not Found</h1>} />
   
//             </Routes>
//         </AppRouter>
//     );
// };

// export default Router;
//  import { BrowserRouter as AppRouter, Routes, Route } from 'react-router-dom';
// import auth from '../views/auth/auth.';
// import chat from '../views/chat/chat';


// export const Router = () => {
//     return (
//         <AppRouter>
//             <Routes>
//                 <Route path="/" element={<h1>Home</h1>} />
//                 <Route path="/auth" element={<auth />} />
//                 <Route path="/auth/success" element={<h1>Success</h1>} />
//                 <Route path="/chat" element={<chat />} />
//                 <Route path="*" element={<h1>404 Not Found</h1>} />
//             </Routes>
//         </AppRouter>
//     )
// }
import { BrowserRouter as AppRouter, Routes, Route } from 'react-router-dom';
import Auth from '../views/auth/auth';  // ✅ Fix 1: Capitalized component and correct path
import Chat from '../views/chat/chat';  // ✅ Fix 2: Same here

export const Router = () => {
    return (
        <AppRouter>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/auth" element={<Auth />} /> {/* ✅ Correct */}
                <Route path="/auth/success" element={<h1>Success</h1>} />
                <Route path="/chat" element={<Chat />} /> {/* ✅ Correct */}
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </AppRouter>
    );
};

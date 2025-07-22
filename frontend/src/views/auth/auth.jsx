// import React from 'react'
// import './auth.css'

// const auth = () => {

//     const handGoogleSignIn = () => {
//         window.location.href='http://localhost:3000/auth/google';
//     }

//   return (
//     <div>
//         <main className='auth-main'>
//             <section className='auth-section'>
//                 <button className='continue-with-google'>
//                     continue with Google
//                     onClick={handGoogleSignIn}
//                 </button>
//             </section>
//         </main>
//     </div>
//   )
// }

// export default auth;

// import React from 'react'
// import "./auth.scss";


// const auth = () => {

//     const handleGoogleSignIn = () => {
//         window.location.href = 'http://localhost:3000/api/auth/google ';
//     }

//     return (
        
//             <main className='auth-main'>
//                 <section className='auth-section'>
//                     <button className='continue-with-google' onClick={handleGoogleSignIn}>
//                         continue with Google
//                     </button>
//                 </section>
//             </main>
        
//     )
// }

// export default auth;
import React from 'react'
import './auth.scss'

const auth = () => {

    const handleGoogleSignIn = () => {
        // Logic for Google Sign-In
        window.location.href = 'http://localhost:3000/api/auth/google';
    }

    return (
        <main className='auth-main' >
            <section className="auth-section">
                <button className="continue-with-google"
                    onClick={handleGoogleSignIn}
                >
                    Continue with Google
                </button>
            </section>
        </main>
    )
}

export default auth
 
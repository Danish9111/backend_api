// // // ============================================
// // // 📚 ASYNC/AWAIT & PROMISES - Practice File
// // // ============================================

// // ============================================
// // 2️⃣ PROMISE THAT RETURNS DATA
// // ============================================

// console.log('2️⃣ Promise with Data:\n');

// // function fetchUser(userId) {
// //     return new Promise((resolve, reject) => {
// //         console.log(`Fetching user ${userId}...`);

// //         setTimeout(() => {
// //             // Simulating database/API response
// //             const users = {
// //                 1: { id: 1, name: 'Nadeem', email: 'nadeem@email.com' },
// //                 2: { id: 2, name: 'Ali', email: 'ali@email.com' },
// //             };

// //             const user = users[userId];

// //             if (user) {
// //                 resolve(user);
// //             } else {
// //                 reject(`User ${userId} not found!`);
// //             }
// //         }, 1500);
// //     });
// // }

// // // Using it
// // fetchUser(2)
// //     .then(user => console.log('Found user:', user))
// //     .catch(error => console.log('Error:', error));


// function getCustomUser(userId) {
//     return new Promise(
//         (resolve, reject) => {

//             setTimeout(() => {
//                 const users = {

//                     1: { id: 1, name: 'nadeem', age: 24 },
//                     2: {
//                         id: 2, name: 'ali', age: 20
//                     },
//                 }
//                 const user = users[userId];
//                 if (user) {
//                     resolve(user);
//                 }
//                 else {
//                     reject(`User ${userId} not found!`);
//                 }

//             }, 1500);

//         }
//     );
// }
// getCustomUser(1).then(
//     (user) => console.log(`user found : ${user.name}`)).catch((error) => console.log(error));
// // // ============================================
// // // 3️⃣ ASYNC/AWAIT (Modern Way!)
// // // ============================================

// console.log('\n3️⃣ Async/Await:\n');

// // Same fetchUser function, but using async/await
// // async function getUserDetails() {
// //     try {
// //         console.log('Starting async function...');

// //         const user = await getCustomUser(1);  // Wait for Promise!
// //         console.log('Got user with async/await:', user);

// //         return user;
// //     } catch (error) {
// //         console.log('Error caught:', error);
// //     }
// // }

// async function getUserDetails() {

//     try {

//         const user = await getCustomUser(1);
//         console.log(user.name);

//     }
//     catch (e) {
//         console.log(e);
//     }
// }

// // Call the async function
// getUserDetails();

// // // ============================================
// // // 4️⃣ MULTIPLE AWAITS (Sequential)
// // // ============================================

// console.log('4️⃣ Multiple Awaits:\n');

// // function fetchPosts(userId) {
// //     return new Promise((resolve) => {
// //         setTimeout(() => {
// //             resolve([
// //                 { id: 1, title: 'First Post', userId },
// //                 { id: 2, title: 'Second Post', userId },
// //             ]);
// //         }, 1000);
// //     });
// // }

// function fetchPosts(userId) {
//     return new Promise((resolve) => {
//         resolve(
//             {
//                 id: 1,
//                 title: 'First Post',
//             },
//             {
//                 id: 2,
//                 title: 'Second Post',
//             }
//         );
//     })
// }

// async function getUserWithPosts() {
//     try {
//         // These run one after another (sequential)
//         // const user = await getCustomUser(2);
//         // console.log('User:', user.name);

//         // const posts = await fetchPosts(user.id);
//         // console.log('Posts:', posts);
//         const user = await getCustomUser(2);
//         console.log(`user name : ${user.name}`);
//         const posts = await fetchPosts(user.id);
//         console.log(`posts : ${posts.title}`);

//     } catch (error) {
//         console.log('Error:', error);
//     }
// }

// // Uncomment to run:
// getUserWithPosts();

// // // ============================================
// // // 5️⃣ PROMISE.ALL (Parallel - Faster!)
// // // ============================================

// // console.log('5️⃣ Promise.all (Parallel):\n');

// // async function fetchMultipleUsers() {
// //     try {
// //         // Run all at the same time (parallel)
// //         const [user1, user2] = await Promise.all([
// //             fetchUser(1),
// //             fetchUser(2)
// //         ]);

// //         console.log('User 1:', user1);
// //         console.log('User 2:', user2);
// //     } catch (error) {
// //         console.log('One of them failed:', error);
// //     }
// // }

// // // Uncomment to run:
// // // fetchMultipleUsers();

// // // ============================================
// // // 6️⃣ REAL-WORLD EXAMPLE: API Call
// // // ============================================

// console.log('6️⃣ Real API Call:\n');

// // Using built-in fetch (Node 18+)
// async function fetchFromAPI() {
//     try {
//         console.log('Fetching from real API...');

//         const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
//         const user = await response.json();

//         console.log('Real API user:', user.name);
//         console.log('Email:', user.email);

//     } catch (error) {
//         console.log('API Error:', error.message);
//     }
// }

// // Uncomment to test real API:
// fetchFromAPI();

// // // ============================================
// // // 7️⃣ ERROR HANDLING
// // // ============================================

// // console.log('7️⃣ Error Handling:\n');

// // async function riskyOperation() {
// //     try {
// //         // Try to fetch user that doesn't exist
// //         const user = await fetchUser(999);
// //         console.log(user);

// //     } catch (error) {
// //         // This will run!
// //         console.log('Caught error:', error);
// //     } finally {
// //         // This always runs
// //         console.log('Cleanup done!');
// //     }
// // }

// async function riskyOperation() {
//     try {
//         const user = await getCustomUser(222);
//         console.log(`user name is ${user.name}`);
//     } catch (e) {
//         console.log(`error is ${e}`);

//     }
//     finally {
//         console.log('finall block');
//     }
// }

// // // Uncomment to test error:
// riskyOperation();

// // // ============================================
// // // 8️⃣ ASYNC IN EXPRESS (How You'll Use It!)
// // // ============================================

// // console.log('8️⃣ Express Example (for reference):\n');

// // /*
// // // In your Express routes, you'll use it like this:

// // app.get('/users/:id', async (req, res) => {
// //     try {
// //         const user = await User.findById(req.params.id);  // Database call

// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }

// //         res.json({ data: user });

// //     } catch (error) {
// //         res.status(500).json({ message: 'Server error' });
// //     }
// // });
// // */

// // console.log('Express example is in comments - check the file!\n');

// // // ============================================
// // // 🎯 SUMMARY
// // // ============================================

// // ```
// // ============================================
// // 🎯 ASYNC/AWAIT CHEAT SHEET
// // ============================================

// // 1. Promise = Future value
// //    const promise = new Promise((resolve, reject) => {...});

// // 2. Use Promise:
// //    promise.then(data => ...).catch(err => ...);

// // 3. Async/Await (cleaner):
// //    async function fn() {
// //        const data = await promise;
// //    }

// // 4. Error handling:
// //    try { await risky() } catch (e) { handle(e) }

// // 5. Parallel execution:
// //    await Promise.all([promise1, promise2]);

// // ============================================
// // Run: node src/practice/02_async_await.js
// // ============================================
// // ```

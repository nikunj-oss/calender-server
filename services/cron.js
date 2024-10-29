// import cron from "node-cron";
// import nodemailer from "nodemailer";
// import Event from "../models/Event.js";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });

// // Schedule the cron job to run every minute
// cron.schedule('*/1 * * * *', async () => {
//     console.log("Checking for upcoming events...");

//     try {
//         const now = new Date();
//         const tenMinutesFromNow = new Date(now.getTime() + 10 * 60000);

//         console.log("Current Time: ", now.toISOString());
//         console.log("Ten Minutes From Now: ", tenMinutesFromNow.toISOString());

//         // Fetch events that are starting within the next 10 minutes and have the reminder flag set to true
//         const events = await Event.find({
//             remind: true,
//             $expr: {
//                 $and: [
//                     { $eq: [{ $dayOfYear: "$date" }, { $dayOfYear: now }] }, // Check if the event is today
//                     {
//                         $gte: [
//                             {
//                                 $dateFromString: {
//                                     dateString: {
//                                         $concat: [
//                                             { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // YYYY-MM-DD
//                                             "T", // Add the separator
//                                             "$time" // Assuming time is in format HH:mm or HH:mm:ss
//                                         ]
//                                     }
//                                 }
//                             },
//                             now
//                         ]
//                     },
//                     {
//                         $lte: [
//                             {
//                                 $dateFromString: {
//                                     dateString: {
//                                         $concat: [
//                                             { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Same formatting
//                                             "T", // Separator
//                                             "$time" // Time string
//                                         ]
//                                     }
//                                 }
//                             },
//                             tenMinutesFromNow
//                         ]
//                     }
//                 ]
//             }
//         }).populate('user');

//         console.log("Found Events: ", events); // Log the events found

//         events.forEach(event => {
//             const mailOptions = {
//                 from: process.env.EMAIL,
//                 to: event.user.email,
//                 subject: `${event.title} Reminder`,
//                 text: `${event.title} is starting soon. Please join.`
//             };

//             // Send the reminder email
//             transporter.sendMail(mailOptions, (err, info) => {
//                 if (err) {
//                     console.error("Error sending email:", err);
//                 } else {
//                     console.log("Reminder email sent:", info.response);
//                 }
//             });
//         });

//     } catch (error) {
//         console.error("Error fetching events or sending emails:", error);
//     }
// });

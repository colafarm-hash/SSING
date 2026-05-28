import { createBrowserRouter } from "react-router";
import O1Login from "./screens/O1Login";
import C1Home from "./screens/C1Home";
import C2RequestInput from "./screens/C2RequestInput";
import C3InstructorPool from "./screens/C3InstructorPool";
import C4InstructorProfile from "./screens/C4InstructorProfile";
import C5ReservationRoomList from "./screens/C5ReservationRoomList";
import C6RoomDetail from "./screens/C6RoomDetail";
import C7Payment from "./screens/C7Payment";
import C8MatchConfirmed from "./screens/C8MatchConfirmed";
import C9PostLessonRating from "./screens/C9PostLessonRating";
import GroupMatching from "./screens/GroupMatching";
import S1Chat from "./screens/S1Chat";
import S2Location from "./screens/S2Location";
import S3Notifications from "./screens/S3Notifications";
import S4History from "./screens/S4History";
import S5Messages from "./screens/S5Messages";
import S6Profile from "./screens/S6Profile";
import S9Report from "./screens/S9Report";
import EditProfile from "./screens/EditProfile";
import PaymentMethods from "./screens/PaymentMethods";
import NotificationSettings from "./screens/NotificationSettings";
import Support from "./screens/Support";
import Terms from "./screens/Terms";
import NotFound from "./screens/NotFound";

export const router = createBrowserRouter([
  { path: "/login", Component: O1Login, ErrorBoundary: NotFound },
  { path: "/", Component: C1Home, ErrorBoundary: NotFound },
  { path: "/request", Component: C2RequestInput, ErrorBoundary: NotFound },
  { path: "/instructors", Component: C3InstructorPool, ErrorBoundary: NotFound },
  { path: "/instructor/:id", Component: C4InstructorProfile, ErrorBoundary: NotFound },
  { path: "/rooms", Component: C5ReservationRoomList, ErrorBoundary: NotFound },
  { path: "/room/:id", Component: C6RoomDetail, ErrorBoundary: NotFound },
  { path: "/payment", Component: C7Payment, ErrorBoundary: NotFound },
  { path: "/confirmed", Component: C8MatchConfirmed, ErrorBoundary: NotFound },
  { path: "/rating", Component: C9PostLessonRating, ErrorBoundary: NotFound },
  { path: "/group-matching", Component: GroupMatching, ErrorBoundary: NotFound },
  { path: "/chat/:matchId", Component: S1Chat, ErrorBoundary: NotFound },
  { path: "/location", Component: S2Location, ErrorBoundary: NotFound },
  { path: "/notifications", Component: S3Notifications, ErrorBoundary: NotFound },
  { path: "/history", Component: S4History, ErrorBoundary: NotFound },
  { path: "/messages", Component: S5Messages, ErrorBoundary: NotFound },
  { path: "/profile", Component: S6Profile, ErrorBoundary: NotFound },
  { path: "/report/:matchId", Component: S9Report, ErrorBoundary: NotFound },
  { path: "/edit-profile", Component: EditProfile, ErrorBoundary: NotFound },
  { path: "/payment-methods", Component: PaymentMethods, ErrorBoundary: NotFound },
  { path: "/notification-settings", Component: NotificationSettings, ErrorBoundary: NotFound },
  { path: "/support", Component: Support, ErrorBoundary: NotFound },
  { path: "/terms", Component: Terms, ErrorBoundary: NotFound },
  { path: "*", Component: NotFound },
]);

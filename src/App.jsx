import { useEffect, useState } from 'react'

// import Frontpage from "./components/frontpage";

// function App() {
//   return <Frontpage />;
// }

// export default App;
import './App.css'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'
import { useToast } from './context/ToastContext'
import Footer from './components/Footer'
import CyberpunkCourses from './components/CyberpunkCourses'
import CyberpunkHome from './components/CyberpunkHome'
import CyberpunkCourseDetails from './components/CyberpunkCourseDetails'
import CourseCommunity from './components/CourseCommunity'
import Dashboard from './pages/Dashboard'
import UserProgressDashboard from './pages/UserProgressDashboard'
import CourseEditor from './pages/CourseEditor'
import Challenges from './pages/Challenges'
import ChallengeUploader from './pages/ChallengeUploader'
import AuthPage from './pages/AuthPage'
import CourseContent from './pages/CourseContent'
import PremiumPlans from './pages/PremiumPlans'

const PREMIUM_STORAGE_KEY = 'openlearn_premium_active'
const PREMIUM_PLAN_STORAGE_KEY = 'openlearn_premium_plan'

function App() {
  const { user, upgradeToPremium, cancelSubscription } = useAuth()
  const { showToast } = useToast()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [view, setView] = useState('home') // 'home' | 'dashboard' | 'challenge-upload' | 'user-dashboard' | 'editor' | 'challenges' | 'collaborate' | 'course-content' | 'auth' | 'premium-plans'
  const [courses, setCourses] = useState([])
  const [editorCourse, setEditorCourse] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [communityCourse, setCommunityCourse] = useState(null)
  const [customChallenges, setCustomChallenges] = useState([])
  const [activeCourseContent, setActiveCourseContent] = useState(null)
  const isPremium = user?.isPremium || false;

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your premium subscription?')) return;

    try {
      await cancelSubscription();
      showToast('Subscription canceled successfully.', 'success');
    } catch (err) {
      console.error('Failed to cancel subscription:', err);
      showToast('Failed to cancel subscription. Please try again.', 'error');
    }
  };

  const activatePremium = async (plan) => {
    if (!user) {
      setView('auth');
      showToast('Please log in to purchase a premium plan.', 'info');
      return;
    }

    try {
      await upgradeToPremium();
      localStorage.setItem(PREMIUM_PLAN_STORAGE_KEY, plan)
      setView('home')
      showToast(`Premium activated with ${plan} plan.`, 'success')
    } catch (err) {
      console.error('Failed to activate premium:', err);
      showToast('Failed to activate premium. Please try again.', 'error')
    }
  }

  const openPremiumPlans = () => {
    setDetailsOpen(false)
    setView('premium-plans')
  }

  const handleContributeClick = () => {
    setDetailsOpen(false)

    if (!isPremium) {
      setView('premium-plans')
      return
    }

    setView('dashboard')
  }

  const enrollCourse = (course) => {
    if (!course?.title) return;

    setEnrolledCourses((prev) => {
      const alreadyEnrolled = prev.some((c) => c.title === course.title);
      return alreadyEnrolled ? prev : [...prev, course];
    });
  };

  const openCommunity = (course) => {
    if (!course) return;
    enrollCourse(course);
    setCommunityCourse(course);
    setDetailsOpen(false);
    setView('collaborate');
  };

  const openCourseContent = (course) => {
    if (!course?.title) return;
    enrollCourse(course);
    setActiveCourseContent(course);
    setDetailsOpen(false);
    setView('course-content');
  };

  return (
    <>
      <Navbar
        onLogoClick={() => { setDetailsOpen(false); setView('home'); }}
        onLoginClick={() => { setDetailsOpen(false); setView('auth'); }}
        onCoursesClick={() => { setDetailsOpen(false); setView('courses'); }}
        onChallengesClick={() => { setDetailsOpen(false); setView('challenges'); }}
        onDashboardClick={() => { setDetailsOpen(false); setView('user-dashboard'); }}
        onContributeClick={handleContributeClick}
        onBuyPremiumClick={openPremiumPlans}
        isPremium={isPremium}
        enrolledCourses={enrolledCourses}
        onCollaborateCourseClick={openCommunity}
      />
      <main className="pt-16">
        {(!user && ['dashboard', 'user-dashboard', 'editor', 'challenge-upload', 'course-content', 'collaborate'].includes(view)) ? (
          <AuthPage onAuthSuccess={() => setView(view)} />
        ) : view === 'editor' ? (
          <CourseEditor
            course={editorCourse}
            setCourse={(updated) => {
              setEditorCourse(updated);
              setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            }}
            goBack={() => setView('dashboard')}
          />
        ) : view === 'dashboard' ? (
          <Dashboard
            courses={courses}
            customChallenges={customChallenges}
            openCourse={(c) => { setSelectedCourse(c); setDetailsOpen(true); setView('home'); }}
            createNew={() => {
              const newCourse = {
                id: Date.now(),
                title: 'Untitled Course',
                category: '',
                level: 'Beginner',
                price: '',
                isPublic: true,
                thumbnail: null,
                instructor: 'You',
                editable: true,
                sections: [{ id: Date.now() + 1, title: 'New Section', lessons: [] }]
              };

              setCourses((prev) => [...prev, newCourse]);
              setEditorCourse(newCourse);
              setView('editor');
            }}
            editCourse={(c) => { setEditorCourse(c); setView('editor'); }}
            createNewChallenge={() => setView('challenge-upload')}
          />
        ) : view === 'challenge-upload' ? (
          <ChallengeUploader
            onSave={(challenge) => {
              setCustomChallenges((prev) => [challenge, ...prev]);
              setView('dashboard');
            }}
            onCancel={() => setView('dashboard')}
          />
        ) : view === 'user-dashboard' ? (
          <UserProgressDashboard
            enrolledCourses={enrolledCourses}
            onOpenCourses={() => setView('courses')}
          />
        ) : view === 'auth' ? (
          <AuthPage onAuthSuccess={() => setView('dashboard')} />
        ) : view === 'premium-plans' ? (
          <PremiumPlans
            isPremium={isPremium}
            onSelectPlan={activatePremium}
            onCancelSubscription={handleCancelSubscription}
            onBack={() => setView('home')}
          />
        ) : view === 'course-content' ? (
          <CourseContent
            course={activeCourseContent}
            onBack={() => setView('courses')}
          />
        ) : view === 'challenges' ? (
          <Challenges customChallenges={customChallenges} />
        ) : view === 'collaborate' ? (
          <CourseCommunity
            enrolledCourses={enrolledCourses}
            activeCourse={communityCourse}
            onSelectCourse={setCommunityCourse}
          />
        ) : view === 'courses' ? (
          <>
            <div className="overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-hide">
              <CyberpunkCourses onSelectCourse={(c) => { setSelectedCourse(c); setDetailsOpen(true); }} />
            </div>

            {detailsOpen && (
              <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setDetailsOpen(false)} />
            )}

            <CyberpunkCourseDetails
              open={detailsOpen}
              course={selectedCourse}
              onClose={() => setDetailsOpen(false)}
              onEnroll={openCourseContent}
              onOpenCommunity={openCommunity}
              editCourse={(c) => { setEditorCourse(c); setView('editor'); }}
            />
          </>
        ) : (
          <CyberpunkHome />
        )}
      </main>
      <Footer />
    </>
  )
}

export default App

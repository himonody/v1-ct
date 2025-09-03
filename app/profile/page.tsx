import { ProfileHeader } from "@/components/profile-header"
import { ProfileMenu } from "@/components/profile-menu"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <main>
        <ProfileHeader />
        <ProfileMenu />
      </main>
    </div>
  )
}

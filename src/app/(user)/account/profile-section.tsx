import { Camera, LogOut, Mail, User as UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type User, deleteSession } from "@/lib/auth";

type ProfileSectionProps = {
	user: User;
};
const ProfileSection = ({ user }: ProfileSectionProps) => {
	const initials = user.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
		: "U";

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">My Profile</h2>
				<Button>Save Changes</Button>
			</div>

			<div className="flex flex-col items-start gap-8 md:flex-row">
				<div className="group relative">
					<Avatar className="h-24 w-24">
						<AvatarImage
							src={`https://avatar.vercel.sh/${user.$id}`}
							alt={user.name || "User"}
						/>
						<AvatarFallback className="text-xl">{initials}</AvatarFallback>
					</Avatar>
					<div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
						<Button variant="ghost" size="icon" className="text-white">
							<Camera className="h-5 w-5" />
						</Button>
					</div>
				</div>

				<div className="w-full flex-1 space-y-4">
					<div className="space-y-2">
						<Label>Full Name</Label>
						<div className="relative flex items-center py-2 pl-9">
							<UserIcon className="text-muted-foreground absolute left-3 h-4 w-4" />
							<span>{user.name}</span>
						</div>
					</div>

					<div className="space-y-2">
						<Label>Email Address</Label>
						<div className="relative flex items-center py-2 pl-9">
							<Mail className="text-muted-foreground absolute left-3 h-4 w-4" />
							<span>{user.email}</span>
						</div>
					</div>

					<div className="pt-4">
						<form action={deleteSession} className="w-full">
							<Button type="submit" variant="outline" className="w-full">
								<LogOut className="mr-2 h-4 w-4" />
								Sign out
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSection;

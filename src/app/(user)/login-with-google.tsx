import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export function LoginWithGoogle() {
	return (
		<form action={auth.withGoogle}>
			<Button variant="outline" className="mt-2 w-full" type="submit">
				Login with Google
			</Button>
		</form>
	);
}

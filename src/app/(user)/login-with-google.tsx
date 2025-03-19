import { Button } from "@/components/ui/button";
import { withGoogle } from "@/lib/auth";

export function LoginWithGoogle() {
	return (
		<form action={withGoogle}>
			<Button variant="outline" className="mt-2 w-full" type="submit">
				Login with Google
			</Button>
		</form>
	);
}

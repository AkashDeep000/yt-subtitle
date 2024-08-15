import { Innertube } from "youtubei.js/cf-worker"

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { searchParams } = new URL(request.url)
		const id = searchParams.get("id")
		if (!id) {
			return Response.json({
				success: false,
				error: {
					reason: "Please provide video ID"
				}
			}, {
				status: 400
			})
		}
		try {
			const yt = await Innertube.create({
				retrieve_player: false,
			})
			const info = await yt.getInfo(id)
			const captions = info.captions?.caption_tracks || []
			return Response.json({
				success: true,
				data: captions
			})
		} catch (error) {
			return Response.json({
				success: false,
				error
			}, {
				status: 400
			})
		}
	},
} satisfies ExportedHandler<Env>;

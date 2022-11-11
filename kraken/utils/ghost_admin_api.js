const properties = require('../properties.json');
const axios = require('axios');
const api = axios.create({
	baseURL: `${properties.GHOST_BASE_URL}/ghost/api/admin/`,
});


module.exports = class GhostAdminAPI {
	constructor() {
	}

	async TearDown() {

		// Get the token from the header set-cookie
		const response = await api.post('session', {
			'username': properties.EMAIL, 'password': properties.PASSWORD,
		});

		const token = response.headers['set-cookie'][0].split(';')[0];
		console.log(token);

		// Delete all tags
		const allTags = await api.get('tags', {
			headers: {
				Cookie: token,
			}
		});

		console.log(allTags.data.tags);

		for (let i = 0; i < allTags.data.tags.length; i++) {
			await api.delete(`tags/${allTags.data.tags[i].id}`, {
				headers: {
					Cookie: token,
				}
			});
		}

		// Delete all posts
		const allPosts = await api.get('posts', {
			headers: {
				Cookie: token,
			},
		});

		for (let i = 0; i < allPosts.data.posts.length; i++) {
			await api.delete(`posts/${allPosts.data.posts[i].id}`, {
				headers: {
					Cookie: token,
				},
			});
		}

		// Delete all pages
		const allPages = await api.get('pages', {
			headers: {
				Cookie: token,
			},
		});

		for (let i = 0; i < allPages.data.pages.length; i++) {
			await api.delete(`pages/${allPages.data.pages[i].id}`, {
				headers: {
					Cookie: token,
				},
			});
		}

		// Delete all members
		const allMembers = await api.get('members', {
			headers: {
				Cookie: token,
			},
		});

		for (let i = 0; i < allMembers.data.members.length; i++) {
			await api.delete(`members/${allMembers.data.members[i].id}`, {
				headers: {
					Cookie: token,
				},
			});
		}
	}
};

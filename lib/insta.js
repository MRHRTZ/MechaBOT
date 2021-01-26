const { default: Axios } = require('axios');
const sesid = '8008647406%3AZOMAWiE1WXFMS0%3A27'

function getUser(username) {
    return new Promise((resolve, reject) => {
        try {
            Axios.get('https://www.instagram.com/' + username + '/?__a=1', {
                headers: {
                    Cookie: `sessionid=${sesid}`
                }
            }).then(({ data }) => {
                const user = data.graphql.user
                resolve({
                    id: user.id,
                    biography: user.biography,
                    subscribersCount: user.edge_followed_by.count,
                    subscribtions: user.edge_follow.count,
                    fullName: user.full_name,
                    highlightCount: user.highlight_reel_count,
                    isBusinessAccount: user.is_business_account,
                    isRecentUser: user.is_joined_recently,
                    accountCategory: user.business_category_name,
                    linkedFacebookPage: user.connected_fb_page,
                    isPrivate: user.is_private,
                    isVerified: user.is_verified,
                    profilePic: user.profile_pic_url,
                    profilePicHD: user.profile_pic_url_hd,
                    username: user.username,
                    postsCount: user.edge_owner_to_timeline_media.count,
                    posts: user.edge_owner_to_timeline_media.edges.map(edge => {
                        let hasCaption = edge.node.edge_media_to_caption.edges[0];
                        return {
                        id: edge.node.id,
                        shortCode: edge.node.shortcode,
                        url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
                        dimensions: edge.node.dimensions,
                        imageUrl: edge.node.display_url,
                        isVideo: edge.node.is_video,
                        caption: hasCaption ? hasCaption.node.text : '',
                        commentsCount: edge.node.edge_media_to_comment.count,
                        commentsDisabled: edge.node.comments_disabled,
                        timestamp: edge.node.taken_at_timestamp,
                        likesCount: edge.node.edge_liked_by.count,
                        location: edge.node.location,
                        children: edge.node.edge_sidecar_to_children ? edge.node.edge_sidecar_to_children.edges.map(edge => {
                            return {
                            id: edge.node.id,
                            shortCode: edge.node.shortcode,
                            dimensions: edge.node.dimensions,
                            imageUrl: edge.node.display_url,
                            isVideo: edge.node.is_video,
                                }
                            }) : []
                        }
                    }) || []
                });
            })
        } catch (e) {
            console.log(e)
        }
    })
}




function getPost(code) {
    return new Promise(function (resolve, reject) {
        if (!code) return reject(new Error('Argument "code" must be specified'));

        Axios.get('https://www.instagram.com/p/' + code + '/?__a=1', {
                headers: {
                    Cookie: `sessionid=${sesid}`
                }
            }).then(({ data }) => {
            const post = data.graphql.shortcode_media
            isVid = post.is_video ? post.video_url : post.display_url
            resolve({
                media_id: post.id,
                shortcode: post.shortcode,
                text: post.accessibility_caption,
                capt: post.edge_media_to_caption.edges[0].node.text,
                url: isVid,
                owner_user: post.owner.username,
                date: post.taken_at_timestamp,
            })
        });
    });
}

function searchUser(query) {
    return new Promise((resolve, reject) => {
        Axios.get('https://www.instagram.com/web/search/topsearch/?query=' + query , {
                headers: {
                    Cookie: `sessionid=${sesid}`
                }
            }).then(({ data }) => {
                const all = data.users
                const result = []
                for (let i = 0; i < all.length; i++) {
                    result.push({
                        number: all[i].position + 1,
                        pk_id: all[i].user.pk,
                        username: all[i].user.username,
                        name: all[i].user.full_name,
                        latest_reel: all[i].user.latest_reel_media,
                        is_private: all[i].user.is_private,
                        is_verified: all[i].user.is_verified,
                        pic: all[i].user.profile_pic_url
                    })
                }
                resolve(result)
            }).catch(reject)
    })
}

async function searchHastag(query) {
    return new Promise((resolve, reject) => {
        Axios.get('https://www.instagram.com/explore/tags/'+ query +'/?__a=1', {
            headers: {
                Cookie: `sessionid=${sesid}`
            }
        }).then(({ data }) => {
            let result = []
            resolve(result)
            const data_node = data.graphql.hashtag.edge_hashtag_to_media.edges
            // resolve(data)
            for (let i = 0; i < data_node.length; i++) {
                const capt = data_node[i].node.edge_media_to_caption.edges[0].node.text
                const link_post = 'https://www.instagram.com/p/' + data_node[i].node.shortcode
                const img = data_node[i].node.display_url
                const timestamp = data_node[i].node.taken_at_timestamp
                const owner_id = data_node[i].node.owner.id
                result.push({
                    status: 200,
                    owner_id: owner_id,
                    link_post: link_post,
                    image: img,
                    timestamp: timestamp,
                    caption: capt
                })
            }
        }).catch(e => reject({ status: 404, message: 'Cannot find hastag ' + query + '!' }))
    })
}

module.exports.searchUser = searchUser
module.exports.getUser = getUser
module.exports.getPost = getPost
module.exports.searchHastag = searchHastag
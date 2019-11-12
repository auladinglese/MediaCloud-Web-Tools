import logging
from flask import jsonify, request
import flask_login

from server import app
from server.util.request import api_error_handler, form_fields_required
from server.auth import user_mediacloud_client, user_mediacloud_key
from server.views.topics import apicache as apicache
from server.views.topics.apicache import topic_focal_sets_list

logger = logging.getLogger(__name__)

OPEN_WEB = 1

@app.route('/api/topics/platforms/all', methods=['GET'])
@flask_login.login_required
@api_error_handler
def topic_platform_list():
    return jsonify({'results': [{'platform': 'open web', 'platform_seed_query': 'dummy'}, {'platform': 'reddit', 'platform_seed_query': 'dummy'}, {'platform': 'twitter', 'platform_seed_query': 'dummy'}]})



@app.route('/api/topics/<topics_id>/platforms/list', methods=['GET'])
@flask_login.login_required
def get_topic_platforms(topics_id):
    # media_type_tags = tags_in_tag_set(TOOL_API_KEY, TAG_SETS_ID_MEDIA_TYPE)
    # how do we get all the seed queries per topic ?
    #merge what the topic has versus what the topic doens't by adding in the topic_seed_queries_id
    return jsonify({'results': [{'id':1, 'platform': 'open web', 'platform_seed_query': 'dummy'}, {'platform': 'reddit', 'platform_seed_query': 'dummy'}, {'platform': 'twitter', 'platform_seed_query': 'dummy'}]})

@app.route('/api/topics/<topics_id>/platforms/add', methods=['POST'])
@flask_login.login_required
@api_error_handler
def topic_add_platform(topics_id):
    user_mc = user_mediacloud_client()
    platform = request.form['current_platform']
    query = request.form['platform_query']

    source = request.form['source'] if 'source' in request.form else None
    # do we need to add dates?
    result = user_mc.topicAddSeedQuery(topics_id, platform, source, query)
    return jsonify({"results": result}) #topic_seed_queries_id

@app.route('/api/topics/<topics_id>/platforms/remove', methods=['GET'])
@flask_login.login_required
@api_error_handler
def topic_remove_platform(topics_id, platform_id):
    user_mc = user_mediacloud_client()
    query = request.form['platform_query']
    result = user_mc.topicRemoveSeedQuery(topics_id, topic_seed_queries_id = platform_id)
    return jsonify({"results": result})

@app.route('/api/topics/<topics_id>/platforms/preview/stories', methods=['GET'])
@flask_login.login_required
@api_error_handler
def api_topics_platform_preview_story_sample(topics_id):
    user_mc = user_mediacloud_client()

    #will do something conditional depending on platform
    platform = request.args['current_platform']

    platform_query = request.args['platform_query']
    num_stories = request.args['limit']
    story_count_result = user_mc.storyList(solr_query=platform_query, sort=user_mc.SORT_RANDOM, rows=num_stories)
    return jsonify(story_count_result)


@app.route('/api/topics/<topics_id>/platforms/preview/story-count', methods=['GET'])
@flask_login.login_required
@api_error_handler
def api_topics_platform_preview_story_count(topics_id):
    user_mc = user_mediacloud_client()
    #will do something conditional depending on platform
    platform = request.args['current_platform']

    platform_query = request.args['platform_query']
    # get inherited topic dates and send them along w
    story_count_result = user_mc.storyCount(solr_query=platform_query)
    return jsonify(story_count_result)
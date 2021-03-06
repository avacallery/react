import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 
import Button from './common/Button';

class ViewPost extends Component {
    state = {
        showComments: false
    }

    clickHandler = () => {
        this.setState({
            showComments: !this.state.showComments,
        });
    }

    renderComments = (post) => {
        return post.comments.map((comment) => {
            return (
                <div key={comment.commenter} className="box">
                    <p>{comment.commenter}</p>
                    <p>{comment.text}</p>
                </div>
            );
        });
    };

    renderStars = (post) => {
        const rating = post.rating; 
        let stars = ""; 
        for (let  i = 0; i < rating; i++) {
            stars += "* "; 
        }
        return stars; 
    }

    render() {
        const postId = parseInt(this.props.match.params.postId); 
        const postIndex = this.props.posts.list.findIndex(
            (item) => item.id === postId
        ); 
        const post = this.props.posts.list[postIndex];

        return (
            //react is only looking for one parent tag (div in this case)
            //the rest of the tags (h1, h2, p) all are children
            <div className="selectedPost">
                <h1>{post.title}</h1>
                <h2>{post.resourceAuthor}</h2>
                <h4>Submitted by: {post.posterName}, Cohort: {post.cohort}</h4>
                <h4>Rating: {this.renderStars(post)}</h4>
                <i>"{post.summary}"</i>
                <p>Time to complete: {post.timeToComplete} minutes</p>
                <a href={`http://${post.link}`}>Click to view article.</a>
                <br></br>
                <Button onClick={this.clickHandler}>
                    {this.state.showComments ? "Hide Comments" : "Show Comments"}
                </Button>
                {this.state.showComments ? this.renderComments(post) : null}
            </div>
        );
    }
};

const mapStoreToProps = store => {
    return {
        posts: store.posts
    }
}

//nest higher order components 
//withRouter(ViewPost) will run first
//then connect() --which gives us access to redux -- will run with that result
export default connect(mapStoreToProps)(withRouter(ViewPost)); 
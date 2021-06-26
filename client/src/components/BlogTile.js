import React from "react";
import "./Blogs.css";
import { Button, Card } from "react-bootstrap";

const BlogTile = (props) => {
    return (
        <Card className="blog-tile">
            <Card.Header >{props.data.from}</Card.Header>
            <Card.Body>
                <Card.Title className="title">{props.data.title}</Card.Title>
                <Card.Text>
                    {props.data.body}
                </Card.Text>
                <Button variant="primary">
                    <a target="_blank" href={props.data.link} rel="noreferrer">
                        View Blog
                    </a>
                </Button>
            </Card.Body>
        </Card>
    );
}

export default BlogTile;
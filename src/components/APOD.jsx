/* eslint-disable react/prop-types */
export default function APOD(props) {

    const {data} = props

    return (
        <div className="mediaContainer">
            {data.media_type === 'video' ? (
                <iframe 
                    src={data?.url} 
                    title={data?.title || 'bg_video'} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="bg_video"
                    allowFullScreen
                    frameBorder="0">
                </iframe>
            ) : (
                <img src={data.url || data.hdurl} alt={data.title || 'bg_img'} className="bg_image"/>
            )}
        </div>
    )
}
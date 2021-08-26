export default `
() => {
    const [boundingBoxDimensions, setBoundingBoxDimensions] = useState({ width: 1920, height: 1280 });
    const [imageLoaded, setImageLoaded] = useState(false);
    const [observedElement, setObservedElement] = useState(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const containerRef = useCallback(
        (node) => {
                    if (node) {
                        const { height, width } = node.getBoundingClientRect();
                        setBoundingBoxDimensions({ height, width });
                    }
        },
        [imageLoaded, observedElement]  
    );

    useEffect(() => {
            if (imageRef.current) {
                const resizeCallback = (entries) => {
                    setObservedElement(entries);
                };
                
                const boxResizeObserver = resizeObserver(resizeCallback);

                boxResizeObserver.observe(imageRef.current as HTMLImageElement);

                return () => {
                    boxResizeObserver.disconnect();
                };
            }
    }, [imageLoaded]);

    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    return (
        <StoryContainer ref={containerRef}>
            {imageLoaded && (
                            <BoundingBoxesComponent
                    {...boundingBoxesProps}
                    outputHeight={boundingBoxDimensions.height}
                    outputWidth={boundingBoxDimensions.width}
                />
                            )}
            <img onLoad={handleImageLoaded} src={imageFile} ref={imageRef} />
        </StoryContainer>
    );
}
`;
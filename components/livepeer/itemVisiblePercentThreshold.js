function SomeComponent() {
    const { listProps } = usePlayerList({
      data: videos,
      itemVisiblePercentThreshold: 35,
    });
  }
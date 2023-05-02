function SomeComponent() {
    const { listProps } = usePlayerList({
      data: videos,
      itemVisiblePercentThreshold: null, // the default item percent can be unset, if needed
      itemVisibleViewAreaCoveragePercentThreshold: 75,
    });
  }
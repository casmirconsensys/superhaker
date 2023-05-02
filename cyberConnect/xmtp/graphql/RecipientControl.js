let follow_unfollow = <div></div>;
  if (ccName) {
    const sanitized_ccName = ccName.replace(".cyber", "");
    follow_unfollow = (
      <div className="justify-right right-16">
        <FollowUnfollowButton handle={sanitized_ccName} />
      </div>
    );
  }

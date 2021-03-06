u:Gem::Specification�	[I"1.8.25:ETiI"diff-lcs; TU:Gem::Version[I"
1.2.3; TIu:	Time�M�    :@_zoneI"UTC; TI"�Diff::LCS computes the difference between two Enumerable sequences using the McIlroy-Hunt longest common subsequence (LCS) algorithm; TU:Gem::Requirement[[[I">=; TU;[I"0; TU;	[[[I">=; TU;[I"0; TI"	ruby; F[o:Gem::Dependency
:
@nameI"rubyforge; T:@requirementU;	[[[I">=; TU;[I"
2.0.4; T:
@type:development:@prereleaseF:@version_requirementsU;	[[[I">=; TU;[I"
2.0.4; To;

;I"	rdoc; T;U;	[[[I"~>; TU;[I"	3.10; T;;;F;U;	[[[I"~>; TU;[I"	3.10; To;

;I"hoe-bundler; T;U;	[[[I"~>; TU;[I"1.2; T;;;F;U;	[[[I"~>; TU;[I"1.2; To;

;I"hoe-doofus; T;U;	[[[I"~>; TU;[I"1.0; T;;;F;U;	[[[I"~>; TU;[I"1.0; To;

;I"hoe-gemspec; T;U;	[[[I"~>; TU;[I"1.0; T;;;F;U;	[[[I"~>; TU;[I"1.0; To;

;I"hoe-git; T;U;	[[[I"~>; TU;[I"1.5; T;;;F;U;	[[[I"~>; TU;[I"1.5; To;

;I"hoe-rubygems; T;U;	[[[I"~>; TU;[I"1.0; T;;;F;U;	[[[I"~>; TU;[I"1.0; To;

;I"hoe-travis; T;U;	[[[I"~>; TU;[I"1.2; T;;;F;U;	[[[I"~>; TU;[I"1.2; To;

;I"	rake; T;U;	[[[I"~>; TU;[I"	10.0; T;;;F;U;	[[[I"~>; TU;[I"	10.0; To;

;I"
rspec; T;U;	[[[I"~>; TU;[I"2.0; T;;;F;U;	[[[I"~>; TU;[I"2.0; To;

;I"hoe; T;U;	[[[I"~>; TU;[I"3.5; T;;;F;U;	[[[I"~>; TU;[I"3.5; TI"diff-lcs; T[I"austin@rubyforge.org; T[I"Austin Ziegler; TI"VDiff::LCS computes the difference between two Enumerable sequences using the
McIlroy-Hunt longest common subsequence (LCS) algorithm. It includes utilities
to create a simple HTML diff output format and a standard diff-like tool.

This is release 1.2.3, fixing a bug in value comparison where the left side of
the comparison was the empty set, preventing the detection of encoding. Thanks
to Jon Rowe for fixing this issue. This is a strongly recommended release.

*Note*: There is a known issue with Rubinius in 1.9 mode reported in
{rubinius/rubinius#2268}[https://github.com/rubinius/rubinius/issues/2268] and
demonstrated in the Travis CI builds. For all other tested platforms, diff-lcs
is considered stable. As soon as a suitably small test-case can be created for
the Rubinius team to examine, this will be added to the Rubinius issue around
this.; TI"#http://diff-lcs.rubyforge.org/; TT@[ 